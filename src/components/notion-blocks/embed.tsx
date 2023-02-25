import Bookmark from './bookmark'
import TweetEmbed from './tweet-embed'

const Embed = ({ block }) => {
  if (/^https:\/\/twitter\.com/.test(block.Embed.Url)) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <Bookmark block={block} />
  }

  return null
}

export default Embed
