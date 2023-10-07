const Hashtag = require("../db/models/hashtag");

exports.handleHashtags = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = new Hashtag(hashtags[i]);
    hashtag.save();
  }
  return;
};

exports.hashtagsLogic = async (hashtagsFromBody) => {
  const hashtagResponse = await Hashtag.find({
    name: {
      $in: hashtagsFromBody,
    },
  });

  const processedHstgs = hashtagResponse.map((el) => el.name);
  const newHashtags = hashtagsFromBody
    .filter((el) => !processedHstgs.includes(el))
    .map((el) => {
      return { name: el };
    });
  console.log(newHashtags);
  const responseInsertNewHashtags = await Hashtag.insertMany(newHashtags);
  return { newHastags: responseInsertNewHashtags, status: 200 };
};
