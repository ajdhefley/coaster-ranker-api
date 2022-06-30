import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoasterService } from '../services/coaster.service';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterImageService } from '../services/coaster-image.service';

@ArgsType()
class CoasterArgs {
  @Field(type => String, { nullable: false })
  url?: string;
}

@Resolver(of => Coaster)
export class CoasterResolver {
  constructor(
    private coasterService: CoasterService,
    private coasterImageService: CoasterImageService
  ) {}

  @Query(returns => [Coaster])
  async coasters() {
    return this.coasterService.findAll();
  }

  @Query(returns => Coaster)
  async coaster(@Args() args: CoasterArgs) {
    return this.coasterService.findOne(args.url);
  }

  @ResolveField(returns => [CoasterImage])
  async ImgList(@Parent() coaster: Coaster) {
    return this.coasterImageService.findAll(coaster.CoasterId);
  }
}