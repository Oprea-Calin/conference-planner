using Charisma.Common.Domain.Dtos;
using Charisma.Common.Domain.Entities.Dictionaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Domain.Abstractions
{
    public interface IDictionariesRepository
    {
        public Task<List<DictionaryCategory>> GetDictionaryCategory();
        public Task<List<DictionaryCity>> GetDictionaryCity();
        public Task<List<DictionaryConferenceType>> GetDictionaryConferenceType();
        public Task<List<DictionaryCountry>> GetDictionaryCountry();
        public Task<List<DictionaryCounty>> GetDictionaryCounty();
        public Task<List<DictionaryStatus>> GetDictionaryStatus();





    }
}
