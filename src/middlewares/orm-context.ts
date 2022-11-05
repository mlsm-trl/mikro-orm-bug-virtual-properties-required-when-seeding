import { MikroORM, RequestContext } from '@mikro-orm/core'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import Container, { Service } from 'typedi'

@Service()
class ORMContextMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (error?: any) => any) {
    RequestContext.createAsync(
      Container.get<MikroORM>('orm').em,
      async (...arguments_: any[]) => {
        await next(...arguments_)
      },
    )
  }
}

export default ORMContextMiddleware
