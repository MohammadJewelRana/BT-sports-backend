import { model, Schema } from 'mongoose';
import { TCampaign, TExpense, TMember } from './campaign.interface';

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
    // startDate: { type: Date, },
    startDate: { type: Date, default:Date.now },
   
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


const ExpenseSchema = new Schema<TExpense>({
  buyer: { type: String, required: true },
  numberOfBall: { type: Number,default:0},
  ballCost: { type: Number, default:0 },
  numberOfTape: { type: Number, default:0 },
  tapeCost: { type: Number, default:0},
  buyDate: { type: Date, required: true },
  totalCost: { type: Number, required: true,default:0 },
  isDeleted: { type: Boolean, default: false }, // Set default value as false
});


export const Campaign = model<TCampaign>('Campaign', campaignSchema);
export const Expense = model<TExpense>('Expense', ExpenseSchema);
