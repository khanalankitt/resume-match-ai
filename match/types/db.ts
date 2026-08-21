import type { ObjectId } from "mongodb";

export interface UserDocument {
  _id: ObjectId;
  name?: string;
  email: string;
  image?: string;
  emailVerified: Date | null;
  createdAt?: Date;
  lastLoginAt?: Date;
}

export interface AnalysisLogDocument {
  _id: ObjectId;
  userId: ObjectId;
  createdAt: Date;
}