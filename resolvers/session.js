const _ = require('lodash');
const { ApolloError } = require('apollo-server');

module.exports = {
  async speakers(session, args, {dataSources}) {
    try {
      const speakers = await dataSources.speakerAPI.getSpeakers();
      const returns = speakers.filter(speaker => {
        return _.filter(session.speakers, {id: speaker.id}).length > 0;
      });

      return returns;
    } catch (error) {
      return new ApolloError("Unable to get speakers", "SPEAKER_API_ERROR", {token: 'UNIQUETOKEN'});
    }

  }
}
