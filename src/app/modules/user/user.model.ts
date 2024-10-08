import { model, Schema } from 'mongoose';
import { TAddress, TImage, TUser } from './user.interface';

// Address Schema
const addressSchema = new Schema<TAddress>({
  buildingNumber: { type: String, required: true },
  flatNumber: { type: String, required: true },
});

// User Schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },

    // gender: { type: String, enum: ['male', 'female', 'other'], required: true },

    whatsapp: { type: String, required: true ,unique:true},
    address: { type: addressSchema, required: true },

    profileImg: { type: String }, // Optional field

    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const imageSchema = new Schema<TImage>(
  {
    userId: { type: Schema.Types.ObjectId, required: true ,ref:'Users'},
    image: { type: String },
     

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
export const Image = model<TImage>('Image', imageSchema);
