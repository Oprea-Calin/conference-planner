using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Entities.Dictionaries;
using Charisma.Common.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Repositories
{
    public class DictionariesRepository(CharismaDbContext dbContext, ILogger<DictionariesRepository> logger) : IDictionariesRepository
    {
        public Task<List<DictionaryCategory>> GetDictionaryCategory()
        {
            var categ = dbContext.DictionaryCategories.ToListAsync();
            

            return categ;
        }

        public Task<List<DictionaryCity>> GetDictionaryCity()
        {
            var categ = dbContext.DictionaryCities.ToListAsync(); //todo optimizeaza si celelalte dictionare ca pe asta


            return categ;
        }
        
        public  Task<List<DictionaryConferenceType>> GetDictionaryConferenceType()
        {
            var categ = dbContext.DictionaryConferenceTypes.ToListAsync();

            return categ;
        }

        public Task<List<DictionaryCountry>> GetDictionaryCountry()
        {
            var categ = dbContext.DictionaryCountries.ToListAsync();

            return categ;
        }

        public  Task<List<DictionaryCounty>> GetDictionaryCounty()
        {
            var categ = dbContext.DictionaryCounties.ToListAsync();
        
            return categ;
        }

        public Task<List<DictionaryStatus>> GetDictionaryStatus()
        {
            var categ = dbContext.DictionaryStatuses.ToListAsync();

            return categ;
        }


    }
}
