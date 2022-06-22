export declare class MongooseModel {
  limit: number;
  skip: number;
  sort: QueryObjectModel;
  select: QueryObjectModel;
  filter: QueryObjectModel;
  populate: QueryObjectModel | QueryObjectModel[];
}
export declare class QueryObjectModel {
  [key: string]: string | number | Date | any;
}
