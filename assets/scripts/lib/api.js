import $ from 'jquery';
import _ from 'underscore';
import limax from 'limax';

const emptyResponse = () => {
  return $.Deferred().resolve();
}

export default class API {
  constructor(options) {
    this.options = options;
    this.pending = {};
    this.store = {};

    const language = this.options.application.get('language');

    this.api = {
      host: '{{API_HOST}}',
      language,
      namespace: 'migrationcontrol',
      version: 'v1',
    };

    // update required language
    this.options.application.on('change:language', (model, value) => {
      this.api.language = value;
    });

    return this;
  }

  _buildAPIUrl(endpoint) {
    const {host, namespace, version, language} = this.api;
    return `${host}/${namespace}/${version}/${language}/${endpoint}/`;
  }

  fetch(endpoint) {
    const url = this._buildAPIUrl(endpoint);

    // send back the promise
    if (!!this.pending[url]) {
      return this.pending[url];
    }

    // send back the content
    if (!!this.store[url]) {
      return $.Deferred().resolve(this.store[url]);
    }

    return this.pending[url] = $.getJSON(url)
      .then(data => {
        this.store[url] = data;
        this.pending[url] = undefined;
        return data;
      });
  }

  findCountryById(id) {
    if (id === undefined) {
      return emptyResponse();
    }

    return this.fetch(`country/${id}`);
  }

  findCountryByISOCode(code) {
    if (code === undefined) {
      return emptyResponse();
    }

    return this.fetch('countriesoverview')
      .then(data => {
        let results = data.map(item => {
          return item.entries.find(country => {
            return country.countryCode === code;
          });
        });

        let {id} = _.compact(results)[0];

        return this.findCountryById(id);
      });
  }

  findBackgroundById(id) {
    if (id === undefined) {
      return emptyResponse();
    }

    return this.fetch(`background/${id}`);
  }

  findCountryBySlug(slug) {
    if (slug === undefined) {
      return emptyResponse();
    }

    return this.fetch('countriesoverview')
      .then(data => {
        let results = data.map(item => {
          return item.entries.find(country => {
            return limax(country.name) === slug;
          });
        });

        let {id} = _.compact(results)[0];

        return this.findCountryById(id);
      });
  }

  findBackgroundBySlug(slug) {
    if (slug === undefined) {
      return emptyResponse();
    }

    return this.fetch('backgroundoverview')
      .then(data => {
        let results = data.map(item => {
          return item.entries.find(background => {
            return limax(background.name) === slug;
          });
        });

        let {id} = _.compact(results)[0];

        return this.findBackgroundById(id);
      });
  }

  findPageBySlug(slug) {
    if (slug === undefined) {
      return emptyResponse();
    }

    return this.fetch('imprint')
      .then(data => data.find(page => slug === limax(page.name)));
  }

  findItemByFirstPosition(collection, type) {
    if (collection === undefined) {
      return emptyResponse();
    }

    return this.fetch(collection)
      .then(data => data.find(item => item.columnIndex === 0))
      .then(column => column.entries[0])
      .then(item => this[`find${type}ById`](item.id));
  }

  findFirstPageOfCollection() {
    return this.fetch('imprint')
      .then(data => data[0]);
  }
};

