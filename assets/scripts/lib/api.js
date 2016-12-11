import $ from 'jquery';
import _ from 'underscore';
import limax from 'limax';

export default class API {
  constructor() {
    this.store = {};
    this.api = {
      host: 'http://localhost:8080',
      language: 'de',
      namespace: 'migrationcontrol',
      version: 'v1',
    };
  }

  _buildAPIUrl(endpoint) {
    const {host, namespace, version, language} = this.api;
    return `${host}/${namespace}/${version}/${language}/${endpoint}/`;
  }

  fetch(endpoint) {
    const url = this._buildAPIUrl(endpoint);

    if (!!this.store[url]) {
      return $.Deferred().resolve(this.store[url]);
    }

    return $.getJSON(url)
      .then(data => {
        this.store[url] = data;
        return data;
      });
  }

  findCountryById(id) {
    return this.fetch(`country/${id}`);
  }

  findCountryBySlug(slug) {
    return this.fetch('countriesoverview')
      .then(data => {
        let id;

        _.forEach(data, item => {
          _.forEach(item.entries, country => {
            if (slug === limax(country.name)) {
              id = country.id;
            }
          })
        });

        return this.findCountryById(id);
      });
  }
};

