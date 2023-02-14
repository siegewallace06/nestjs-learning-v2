import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {

    getBookmarks(userId: number) { };

    getBookmarkByID(userId: number, bookmarkId: number) { };

    createBookmark(userId: number, dto: CreateBookmarkDto) { };

    editBookmarkByID(userId: number, bookmarkId: number, dto: EditBookmarkDto) { };

    deleteBookmarkByID(userId: number, bookmarkId: number) { };
}
