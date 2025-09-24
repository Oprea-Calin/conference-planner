using Charisma.Api.Application.Queries.Dictionaries;
using Charisma.Api.Application.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Charisma.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DictionaryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DictionaryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetDictionaryCategory")]
        public async Task<IActionResult> GetDictionaryCategory([FromRoute]GetDictionaryCategory.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [HttpGet("GetDictionaryCity")]
        public async Task<IActionResult> GetDictionaryCity([FromRoute] GetDictionaryCity.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        
        [HttpGet("GetDictionaryConferenceType")]
        public async Task<IActionResult> GetDictionaryConferenceType([FromRoute] GetDictionaryConferenceType.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("GetDictionaryCountry")]
        public async Task<IActionResult> GetDictionaryCountry([FromRoute] GetDictionaryCountry.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("GetDictionaryCounty")]
        public async Task<IActionResult> GetDictionaryCounty([FromRoute] GetDictionaryCounty.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        

        [HttpGet("GetDictionaryStatus")]
        public async Task<IActionResult> GetDictionaryStatus([FromRoute] GetDictionaryStatus.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }




    }
}
