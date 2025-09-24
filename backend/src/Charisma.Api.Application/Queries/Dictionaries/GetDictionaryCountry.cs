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
    public class GetDictionaryCountry
    {
        public class Query : IRequest<List<DictionaryCountryDTO>> { }

        public class QueryHandler(IDictionariesRepository dictionariesRepository) : IRequestHandler<Query, List<DictionaryCountryDTO>>
        {
            public async Task<List<DictionaryCountryDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await dictionariesRepository.GetDictionaryCountry();

                var cDTO = c.Select(category => new DictionaryCountryDTO
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
