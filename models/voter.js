const { Schema, model } = require("mongoose");

const VoterSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    votingKey: {
      type: String,
      required: false,
    },
    hasVoted: {
      type: Boolean,
      default: false,
    },
    votingProcess: {
      type: Schema.Types.ObjectId,
      ref: "Voting",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

VoterSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Voter", VoterSchema);
