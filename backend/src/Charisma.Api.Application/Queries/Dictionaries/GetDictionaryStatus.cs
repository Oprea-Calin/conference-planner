using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Api.Application.Queries.Dictionaries
{
    public class GetDictionaryStatus
    {
        public class Query : IRequest<List<DictionaryStatusDTO>> { }

        public class QueryHandler(IDictionariesRepository dictionariesRepository) : IRequestHandler<Query, List<DictionaryStatusDTO>>
        {
            public async Task<List<DictionaryStatusDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await dictionariesRepository.GetDictionaryStatus();

                var cDTO = c.Select(category => new DictionaryStatusDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Code = category.Code
                }
                ).ToList();

                return cDTO;

            }
        }
    }
}
