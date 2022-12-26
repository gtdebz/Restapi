//Export the mongoose model player to be used in our controller
module.exports = mongoose => {
 var schema = mongoose.Schema(
     {
        player_name: String,
        matches: Number,
        inns: Number,
        runs: Number,
        hs: Number,
        ave: Number,
        added: Boolean
    },
    { timestamps: true }
    );
  
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

//New player model called playermodel created with a collection called player
  const Player = mongoose.model("player", schema);
  return Player;
};


