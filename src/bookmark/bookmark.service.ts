import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId: userId,
            },
        });
    };

    getBookmarkByID(userId: number, bookmarkId: number) {

        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId: userId,
            },
        });

    };

    async createBookmark(userId: number, dto: CreateBookmarkDto) {

        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto,
            },
        });

        return bookmark;

    };

    async editBookmarkByID(userId: number, bookmarkId: number, dto: EditBookmarkDto) {

        // Get the Bookmark by ID
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            }
        });

        // Check if the bookmark belongs to the user
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to bookmark denied');
        }

        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            }, data: {
                ...dto,
            }
        });

    };

    async deleteBookmarkByID(userId: number, bookmarkId: number) {
        // Get the Bookmark by ID
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            }
        });

        // Check if the bookmark belongs to the user
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access to bookmark denied');
        }

        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            }
        });
    };
}
