import fs from 'fs'
import { promisify } from 'util'
import colors from './colors'

const EXPORT_PATH = './dist/'
const folders = [
	'folder', 'folder-documents', 'folder-music',
	'folder-templates', 'folder-download', 'folder-pictures',
	'folder-publicshare', 'folder-videos', 'user-desktop'
];
const writeFile = promisify(fs.writeFile)
const buildFolders = async path => {
	for(let folder of folders){
		const { default: template }  = await import(`./templates/${folder}`)
		const data = template(colors)  
		try {
			await writeFile(`${path + folder}.svg`, (data))
			console.log(`Folder ${folder} built `)
		} catch (error) {
			console.log(error)
		}
	}
}

buildFolders(EXPORT_PATH)
