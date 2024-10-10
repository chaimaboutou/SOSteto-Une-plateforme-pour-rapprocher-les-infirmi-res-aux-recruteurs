const { ImageUser, Image } = require('../../model/schema');

exports.getImageByIdUser = async (req, res) => {
  try {
    // Find the image ID associated with the user
    const imageUser = await ImageUser.findOne({ id_User: req.params.userId });
    if (!imageUser) {
      return res.status(404).json({ message: 'Image not found for this user' });
    }

    // Find the image details using the image ID
    const image = await Image.findById(imageUser.id_image);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
