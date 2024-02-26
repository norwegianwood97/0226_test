import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { // 회원 번호-자동생성
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { // 회원 이름
        type: String,
        required: true,
    },
    email: { // 회원 이메일
        type: String,
        required: true,
    },
    pw: { // 회원 비밀번호
        type: String,
        required: true,
    },
}, { timestamps: true }); 

export default mongoose.model('User', userSchema);
