module.exports = {
    handleJoiErrors({ details }) {
        const errors = {};
        for(const error of details) {
            const key = error.context.key;
            errors[key] = error.message;
        }
        return {
            success: false,
            errors
        }
    }
}