const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
  
    const getAllTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(getAllTags);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

//get one tag
router.get("/:id", async (req, res) => {
  try {
    const targetedID = req.params.id;
    const getSingleTag = await Tag.findByPk(targetedID, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!getSingleTag) {
      res.status(404).json({ message: "No tag found with this ID!" });
      return;
    }

    res.status(200).json(getSingleTag);
  } catch (error) {
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const postSingleTag = await Tag.create(req.body);
    res.status(200).json(postSingleTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateSingleTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateSingleTag[0]) {
      res.status(404).json({ message: "No tag with this ID!" });
      return;
    }

    res.status(200).json(updateSingleTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteSingleTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteSingleTag) {
      res.status(404).json({ message: "No tag found with this ID!" });
      return;
    }

    res.status(200).json(deleteSingleTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
