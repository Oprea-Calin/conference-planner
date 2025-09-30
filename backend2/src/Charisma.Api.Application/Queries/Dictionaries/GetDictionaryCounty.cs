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
    public class GetDictionaryCounty
    {
        public class Query : IRequest<List<DictionaryCountyDTO>> { }

        public class QueryHandler(IDictionariesRepository dictionariesRepository) : IRequestHandler<Query, List<DictionaryCountyDTO>>
        {
            public async Task<List<DictionaryCountyDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await dictionariesRepository.GetDictionaryCounty();

                var cDTO = c.Select(category => new DictionaryCountyDTO
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
