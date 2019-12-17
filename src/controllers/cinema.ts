import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal, Connection, getRepository,createQueryBuilder } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';