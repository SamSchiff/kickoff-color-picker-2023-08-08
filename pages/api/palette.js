import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "GET") {
    const palettes = await knex("palette");
    res.status(200).json(palettes);
  } else if (req.method === "POST") {
    await knex("palette")
      .insert({
        color0: req.body.color0,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,
      })
    res.status(200).json({"message": "success"});
  } else if (req.method === "PUT") {
    await knex("palette")
      .where({ id: req.body.id })
      .update({
          color0: req.body.color0,
          color1: req.body.color1,
          color2: req.body.color2,
          color3: req.body.color3,
          color4: req.body.color4,
        }
      );
    res.status(200).json({"message": "success"});
  } else if (req.method === "DELETE") {
    await knex("palette")
    .where({id: req.body.id})
    .delete();
    res.status(200).json({"message": "success"});
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
