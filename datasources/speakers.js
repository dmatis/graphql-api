const { RESTDataSource } = require('apollo-datasource-rest');

// Thin wrapper around a REST api to fetch speakers data
class SpeakerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/speakers'
  }

  async getSpeakerById(id) {
    const data = await this.get(`/${id}`);
    return data;
  }

  async getSpeakers() {
    const data = await this.get('/');
    return data;
  }
}

module.exports = SpeakerAPI;