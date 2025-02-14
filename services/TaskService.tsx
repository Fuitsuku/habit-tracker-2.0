"use client"

import axios, { AxiosInstance, AxiosResponse } from "axios";

interface APIClient {
    client: AxiosInstance;
};

class TaskService implements APIClient {
    client = axios.create({
        baseURL: "https://pwsmmjqrh7.execute-api.us-west-2.amazonaws.com/production",
        timeout:  10000,
        headers: {"Content-Type" : "application/json"}
    });


}