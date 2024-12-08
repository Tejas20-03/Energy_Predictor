import User from "@/Modal/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

const VALID_COMPANY_CODE =
  process.env.ADMIN_COMPANY_CODE || "YOUR_DEFAULT_CODE";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { name, email, password, userType, companyCode } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (userType === "admin") {
      if (!companyCode) {
        return NextResponse.json(
          { error: "Company code is required for admin registration" },
          { status: 400 }
        );
      }

      if (companyCode !== VALID_COMPANY_CODE) {
        return NextResponse.json(
          { error: "Invalid company code" },
          { status: 401 }
        );
      }
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userType: userType || "general",
      companyCode: userType === "admin" ? companyCode : undefined,
    });
    return NextResponse.json({
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
