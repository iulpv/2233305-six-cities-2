import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {OfferEntity} from '../offer/offer.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    type: () => String,
    required: true,
    minlength: [5, 'Min length for comment is 5'],
    maxlength: [1024, 'Max length for comment is 1024']
  })
  public text!: string;

  @prop({
    type: () => OfferEntity,
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({required: true, type: () => Date})
  public publicationDate!: Date;

  @prop({
    type: () => UserEntity,
    ref: UserEntity,
    required: true,
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    type: () => Number,
    required: true, min: [1, 'Min rating is 1'],
    max: [5, 'Max rating is 5']
  })
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
