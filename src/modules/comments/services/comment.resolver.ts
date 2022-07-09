import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';
import { CommentService } from './comment.service';

@ArgsType()
class CommentArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => Comment)
export class CommentResolver {
    constructor(private commentService: CommentService) { }

    @Query(returns => [Comment])
    async comments(@Args() args: CommentArgs) {
        return this.commentService.findBy(args.coasterUrl);
    }
}