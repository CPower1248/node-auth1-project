exports.seed = function(knex) {
  return knex("users").truncate()
    .then(function () {
      return knex("users").insert([
        { username: "corey", password: "reyxco" },
        { username: "phil", password: "hixpl" }
      ]);
    });
};
