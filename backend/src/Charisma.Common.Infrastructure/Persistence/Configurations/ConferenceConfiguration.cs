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
    public class ConferenceConfiguration : IEntityTypeConfiguration<Conference>
    {
        public void Configure(EntityTypeBuilder<Conference> builder)
        {
            builder.ToTable("Conference");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(200);
            builder.HasOne(x => x.conferenceType).WithMany().HasForeignKey(x => x.ConferenceTypeId);
            builder.HasOne(x => x.location).WithMany().HasForeignKey(x => x.LocationId);
            builder.HasOne(x => x.category).WithMany().HasForeignKey(x => x.CategoryId);


        }

    }
}
