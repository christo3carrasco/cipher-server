const { Schema, model } = require("mongoose");

const VoteSchema = Schema(
  {
    voter: {
      type: Schema.Types.ObjectId,
      ref: "Voter",
      required: true,
      unique: true,
    },
    optionNumber: {
      type: Number,
      required: true,
    },
    votingProcess: {
      type: Schema.Types.ObjectId,
      ref: "Voting",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

VoteSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Vote", VoteSchema);
