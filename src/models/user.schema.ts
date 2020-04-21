import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,
  },
  seller: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  created: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash((this as any | null)['password'], 10);
    (this as any)['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

/* function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj
} */
