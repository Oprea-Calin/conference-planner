using Charisma.Common.Domain.Entities.Conference;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Configurations
{
    public class ConferenceXSpeakerConfiguration : IEntityTypeConfiguration<ConferenceXSpeaker>
    {
        public void Configure(EntityTypeBuilder<ConferenceXSpeaker> builder)
        {
            builder.ToTable("ConferenceXSpeaker");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.HasOne(x => x.Speaker).WithMany().HasForeignKey(x => x.SpeakerId);


        }

    }
}
