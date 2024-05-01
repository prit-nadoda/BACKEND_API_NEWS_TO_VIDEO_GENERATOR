import Creatomate from "creatomate";
export const generateNewsVideo = (headLine, imgUrl, dayCount) => {
  const { headLine, imgUrl, dayCount } = req.body;
  if (!headLine || !imgUrl || !dayCount) {
    return next(new ErrorHandler("Please provide required Information", 400));
  }
  const client = new Creatomate.Client(process.env.CREATOMATE_API_KEY);

  const options = {
    templateId: "beda569d-5b83-4391-a5c5-b8eb14d3e78a",

    modifications: {
      headLine: `${headLine}`,
      imgUrl: `${imgUrl}`,
      blurPhoto: `${imgUrl}`,
      dayCount: `Day ${dayCount} of What Happend in last 24 Hours in the World!`,
    },
  };

  client
    .render(options)
    .then((renders) => {
      console.log(renders);
    })
    .catch((error) => console.error(error));

  return renders;
};
