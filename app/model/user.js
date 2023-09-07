const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be null']
    },
    username: {
        type: String,
        required: [true, 'Username cannot be null'],
        max: 20
    },
    password: {
        type: String,
        required: [true, 'Password cannot be null'],
    },
    id_product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }
})

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

// Export model User sehingga dapat digunakan di tempat lain dalam aplikasi Anda
module.exports = User;