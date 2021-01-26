exports.seed = function(knex) {
  return knex("users").truncate()
    .then(function () {
      return knex("users").insert([
        // These are invalid because of hash...
        { username: "corey", password: "reyxco" },
        { username: "phil", password: "hixpl" }
      ]);
    });
};
