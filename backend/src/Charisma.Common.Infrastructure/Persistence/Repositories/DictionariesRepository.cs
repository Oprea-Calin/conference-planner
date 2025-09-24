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
        public async Task<List<DictionaryCategory>> GetDictionaryCategory()
        {
            var categ = new List<DictionaryCategory>();
            categ = await dbContext.DictionaryCategories.ToListAsync();
            

            return await Task.FromResult(categ);
        }

        public async Task<List<DictionaryCity>> GetDictionaryCity()
        {
            var categ = new List<DictionaryCity>();
            categ = await dbContext.DictionaryCities.ToListAsync();


            return await Task.FromResult(categ);
        }
        
        public async Task<List<DictionaryConferenceType>> GetDictionaryConferenceType()
        {
            var categ = new List<DictionaryConferenceType>();
            categ = await dbContext.DictionaryConferenceTypes.ToListAsync();


            return await Task.FromResult(categ);
        }

        public async Task<List<DictionaryCountry>> GetDictionaryCountry()
        {
            var categ = new List<DictionaryCountry>();
            categ = await dbContext.DictionaryCountries.ToListAsync();


            return await Task.FromResult(categ);
        }

        public async Task<List<DictionaryCounty>> GetDictionaryCounty()
        {
            var categ = new List<DictionaryCounty>();
            categ = await dbContext.DictionaryCounties.ToListAsync();


            return await Task.FromResult(categ);
        }

        public async Task<List<DictionaryStatus>> GetDictionaryStatus()
        {
            var categ = new List<DictionaryStatus>();
            categ = await dbContext.DictionaryStatuses.ToListAsync();


            return await Task.FromResult(categ);
        }


    }
}
