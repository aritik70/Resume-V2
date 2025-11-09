// In-memory storage for the application
// This storage is lightweight and requires no database setup

export interface IStorage {
  // Add any CRUD methods here if needed in the future
}

export class MemStorage implements IStorage {
  // In-memory storage implementation
  // Data is stored in memory and will be lost when the server restarts
}

export const storage = new MemStorage();
