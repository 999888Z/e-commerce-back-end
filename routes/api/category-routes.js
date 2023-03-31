const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const getAllCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(getAllCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get one category
router.get("/:id", async (req, res) => {
  try {
    const targetedID = req.params.id;
    const getSingleCategory = await Category.findByPk(targetedID, {
      include: [{ model: Product }],
    });

    if (!getSingleCategory) {
      res.status(404).json({ message: "No category found with this ID!" });
      return;
    }

    res.status(200).json(getSingleCategory);
  } catch (error) {
    res.status(500).json(error);
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const postSingleCategory = await Category.create(req.body);
    res.status(200).json(postSingleCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateSingleCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateSingleCategory[0]) {
      res.status(404).json({ message: "No category with this ID!" });
      return;
    }

    res.status(200).json(updateSingleCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteSingleCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteSingleCategory) {
      res.status(400).json({ message: "No category found with this ID!" });
    }

    res.status(200).json(deleteSingleCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
