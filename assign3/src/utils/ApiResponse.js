class ApiResponse {
    constructor(statusCode, message="Success", data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 300; // if status code is in the range of 200-299 then success is true otherwise false
    }
}

export default ApiResponse