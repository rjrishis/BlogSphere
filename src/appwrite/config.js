import config from "../config/config";
import { Client, Databases,Storage,Query, ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrtie service :: createPost :: error" , error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        console.log(featuredImage)
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrtie service :: updatePost :: error" , error);
        }
    }
    async deletePost(slug){
        try {
           await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
           ) 
           return true;
        } catch (error) {
            console.log("Appwrtie service :: deletePost :: error" , error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrtie service :: getPost :: error" , error);
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries, 
    
            )
        } catch (error) {
            console.log("Appwrtie service :: getPosts :: error" , error);
        }
    }
    async uploadFile(file){
        try {
            return this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log("Appwrtie service ::  deleteFile :: error" , error);
            return false;
        }
    }
    async deleteFile(fileId){
        console.log(fileId)
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrtie service :: deleteFile :: error" , error);
            return false

        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
            
        )
    }
}

const service = new Service();
export default service;