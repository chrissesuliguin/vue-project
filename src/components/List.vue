<template>
  <div class="list">
    <p v-if="missions.length"> Showing {{missions.length}} of missions</p>
    <p v-if="!missions.length"> No missions found</p>
    <section v-if="missions.length">
      <article v-for="(m, i) in missions" :key="i" class="row">
        <div class="col-md-2 logo">
          <img :src="m.links.mission_patch" alt="Mission Patch" />
        </div>
        <div class="col-md-8 details">
          <h5>
            {{m.rocket.rocket_name}} - {{m.payloads[0].payload_id}}
            <span v-if="!m.launch_success || !m.land_success">- <b>Failed Mission</b></span>
          </h5>
          <p>Launched at {{m.launch_date_local}} from {{getFullName(m.launch_site.site_id)}} </p>
          <div class="btn-links">
            <a v-if="m.links.reddit_campaign" :href="m.links.reddit_campaign" class="btn btn-light" target="_blank">Reddit Campaign</a>
            <a v-if="m.links.reddit_launch" :href="m.links.reddit_launch" class="btn btn-light" target="_blank">Reddit Launch</a>
            <a v-if="m.links.reddit_media" :href="m.links.reddit_media" class="btn btn-light" target="_blank">Reddit Media</a>
            <a v-if="m.links.presskit" :href="m.links.presskit" class="btn btn-light" target="_blank">Press Kit</a>
            <a v-if="m.links.article_link" :href="m.links.article_link" class="btn btn-light" target="_blank">Article</a>
            <a v-if="m.links.video_link" :href="m.links.video_link" class="btn btn-light" target="_blank">Watch Video</a>
          </div>
        </div>
        <div class="col-md-2 num">
          <h2>#{{m.flight_number}}</h2>
          <p>Flight Number</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'List',
  data () {
    return {

    }
  },
  created(){
  },

  computed: {
    ...mapGetters({
      launches: 'getMissions',
      filters: 'getFilters',
      filtered: 'getFilteredMissions',
      launchpads: 'getLaunchPads',
    }),
    missions() {
      return this.filtered.length || this.filters  ? this.filtered : this.launches;
    }
  },
  methods: {
    getFullName(id){
      return this.launchpads.find(pad => pad.id == id).full_name;
    }
  }
}
</script>

<style scoped lang="scss">
.list{
  padding: 20px;
  section{
    article{
      padding: 10px 0;
      height: 200px;
      box-sizing: border-box;
      font-size: 14px;
      color: #aaaaaa;

      .logo{
        img{
          width: 100px;
          height: 100px;
        }
      }
      .details{
        text-align: left;
        h5{
          margin-top: 10px;
          font-weight: 700;
          color: #4b4b4b;

          b{
            color: #e46565;
          }
        }
        .btn-links{
          a {
            font-size: 14px;
            color: #aaaaaa;
            border: 1px #eee solid;
            margin-right: 10px;
          }
        }
      }

      .num{
        h2{
          color: #4b4b4b;
        }
      }
    }
  }
}
</style>
