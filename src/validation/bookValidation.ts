import {z} from 'zod';

export const createBookSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    author: z.string().min(3, 'Author is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive'),
    category: z.string().min(3, 'Category is required'),
    stock: z.number().int().nonnegative('Stock must be positive'),
});

export const updateBookSchema = z.object({
    title: z.string().min(3, 'Title is required').optional(),
    author: z.string().min(3, 'Author is required').optional(),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive').optional(),
    category: z.string().min(3, 'Category is required').optional(),
    stock: z.number().int().nonnegative('Stock must be positive').optional(),
});