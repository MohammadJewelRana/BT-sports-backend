import { model, Schema } from 'mongoose';
import { TCampaign, TMember } from './campaign.interface';

const memberSchema = new Schema<TMember>({
    id: { type: Schema.Types.ObjectId, required: true ,ref:'Users'},
    name: { type: String, required: true },
    image: { type: String,default:null }, 
    paymentStatus: { type: String, enum: ['paid', 'unpaid'],default:'unpaid' },
    paidAmount: { type: Number,default:null },
  });


const campaignSchema = new Schema<TCampaign>(
  {
    purpose: { type: String, required: true },
    startDate: { type: Date, },
    endDate: { type: Date,  },
    status: { type: String, enum: ['pending', 'ongoing', 'end'], default: 'pending' },
    members: { type: [memberSchema], default: [] },
    grandTotal:{type:Number,default:0},
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Campaign = model<TCampaign>('Campaign', campaignSchema);
