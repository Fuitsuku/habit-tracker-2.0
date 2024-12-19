import axios, { AxiosInstance, AxiosResponse } from "axios";

interface TaskApiConfig {
    baseURL: string; // The base URL for the API
    timeout?: number; // Optional: Request timeout
    headers?: Record<string, string>; // Optional: Default headers
}

class TaskApiWrapper {
    private client: AxiosInstance;

    constructor(config: TaskApiConfig) {
        this.client = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 10000, // Default timeout: 10s
            headers: config.headers || { "Content-Type": "application/json" },
        });
    }

    // Parses this_month_task objects and returns it as a list of tasks
    parseTMT(this_month_tasks_raw:object){
        let i = 0;
        let converted_task_list = [];
        for (const key in this_month_tasks_raw) {
            const current_task = this_month_tasks_raw[key];
            converted_task_list[i] = {
                "task-id" : key,
                "completed" : current_task["completed"],
                "day-streak" : current_task["day-streak"],
                "growth-factor" : current_task["growth-factor"],
                "point-value" : current_task["point-value"],
                "task-name" : current_task["task-name"]
            }
            i++;
        }
        return converted_task_list;
    };

    // Parses next_month_task objects and returns it as a list of tasks
    parseNMT(next_month_tasks_raw:object){
        let i = 0;
        let converted_task_list = [];
        for (const key in next_month_tasks_raw) {
            const current_task = next_month_tasks_raw[key];
            converted_task_list[i] = {
                "task-id" : key,
                "growth-factor" : current_task["growth-factor"],
                "point-value" : current_task["point-value"],
                "task-name" : current_task["task-name"]
            }
            i++;
        }
        return converted_task_list;
    };

    // Get Tasks
    async getTasksCall(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Create Task
    async createTaskCall(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Delete Task
    async deleteTaskCall(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Complete Task
    async completeTaskCall(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Generic error handler (customize as needed)
    private handleError(error: any): Error {
        // Add custom error handling logic here
        if (error.response) {
            // Server responded with a status outside 2xx
            console.error("AccountApi Error:", error.response.data);
        } else if (error.request) {
            // No response received
            console.error("Network Error:", error.request);
        } else {
            // Error setting up the request
            console.error("Error:", error.message);
        }
        return new Error(error.response.data["body"]["message"] || "An error occurred");
    }
}

export default TaskApiWrapper;

// Placeholder for a generic GET request
    // Uncomment and customize this method if needed
    /*
    async getExample(endpoint: string, params?: Record<string, any>): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.get(endpoint, { params });
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    */

    // Placeholder for a generic POST request
    // Uncomment and customize this method if needed
    /*
    async postExample(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    */

    // Placeholder for a generic PUT request
    // Uncomment and customize this method if needed
    /*
    async putExample(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.put(endpoint, data);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    */

    // Placeholder for a generic DELETE request
    // Uncomment and customize this method if needed
    /*
    async deleteExample(endpoint: string): Promise<AxiosResponse<any>> {
        try {
            const response = await this.client.delete(endpoint);
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    */