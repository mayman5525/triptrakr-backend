const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    total_clicks: {
      type: Number,
      default: 0,
    },
    // past_trips: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Trip",
    //   default: {
    //     Trip_id: "",
    //     Trip_date: "",
    //   },
    // },
    // fav_trips: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Trip",
    //   },
    // ],
    // past_bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking",
    //   },
    // ],
    // fav_bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking",
    //     default: {
    //       Booking_id: "",
    //       Booking_date: "",
    //     },
    //   },
    // ],
    location: {
      type: String,
      default: "",
    },
    profile_url: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1688294025/test_rhvhku.png",
    },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    gender: {
      type: String,
      required: false,
      default: "",
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    city: {
      type: String,
      required: false,
      default: "",
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
    user_ip_address: {
      type: String,
      required: false,
      default: "",
    },
    package_kind: {
      type: String,
      required: true,
      default: "Free",
    },
  },
  { timestamps: true }
);

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.pre("save", function (next) {
  if (typeof this.f_name === "string" && typeof this.l_name === "string") {
    this.first_name = this.first_name.toLowerCase();
    this.last_name = this.last_name.toLowerCase();

    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    this.full_name = `${capitalize(this.first_name)} ${capitalize(
      this.last_name
    )}`;
  }

  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
