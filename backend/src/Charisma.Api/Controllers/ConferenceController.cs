using Charisma.Api.Application.Queries.Conference;
using Charisma.Api.Application.Queries.Users;
using Charisma.Common.Domain.Dtos.Commands;
using Charisma.Common.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NBB.Correlation;
using System.Threading.Tasks;

namespace Charisma.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ConferenceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ConferenceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetLocation")]
        public async Task<IActionResult> GetLocation([FromRoute] GetLocation.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("GetAllConferences")]
        public async Task<IActionResult> GetAllConferences([FromRoute] GetAllConferences.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("GetConferenceById/{id}")]
        public async Task<IActionResult> GetConferenceById([FromRoute] GetConferenceById.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("GetConfercesFiltered")]
        public async Task<IActionResult> GetConfercesFiltered([FromQuery] GetConfercesFiltered.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost("SaveConference")]
        public async Task<IActionResult> SaveConference([FromBody]SaveConference command)
        {

            await _mediator.Send(command);
            return Ok(new AsyncCommandResult(CorrelationManager.GetCorrelationId()));
        }












    }
}
