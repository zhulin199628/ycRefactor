import { request } from "./request.js"

const GET = 'GET';
const POST = 'POST';

const contentType = {
	  formData: "application/x-www-form-urlencoded",
	  application:  "application/json"
}
   
//接口地址
const apiUrl = "https://www.krifation.cn/";
// const apiUrl = "http://47.99.141.28:8080/"

export const URLS = {
	//文件上传
	fileApi: {
		saveImageToOSS:`${apiUrl}file/saveImageToOSS`,//图片上传
		saveVoiceToOSS:`${apiUrl}file/saveVoiceToOSS`,//音频上传（字节流）
		saveVoiceToOSSByByte:`${apiUrl}file/saveVoiceToOSSByByte`,//音频上传（byte数组）
		getMediaByMediaId:`${apiUrl}file/getMediaByMediaId`,//音频上传（临时地址）
		saveVideoToOSS:`${apiUrl}file/saveVideoToOSS`,//视频上传（字节流）
	},
	//用户列表  
	loginApi: {
		phoneLogin: `${apiUrl}user/phoneLogin`, //手机号验证登录
		sendVerificationCode: `${apiUrl}user/sendVerificationCode`, //获取验证码
		xcxWxVerify: (data) => request(data, POST,contentType.application,`${apiUrl}user/xcxWxVerify`), //微信登陆
		submitFeedBack:(data) => request(data, POST,contentType.application,`${apiUrl}user/submitFeedBack`), //提交用户反馈
	},
	//首页和我的
	homePageApi: {
		homePageBanner:(data) =>request(data,GET,contentType.formData,`${apiUrl}homePage/homePageBanner`),
		homePageIssueAndClass: (data) => request(data,GET,contentType.formData,`${apiUrl}homePage/homePageIssueAndClass`) , //首页精选问答、课程
		homePageTrainingAndReading: (data) => request(data, GET,contentType.formData, `${apiUrl}homePage/homePageTrainingAndReading`)  ,//首页训练营、今日阅读
		messageList:(data) => request(data, GET,contentType.formData,`${apiUrl}homePage/messageList`),//站内信列表接口
		myPage: (data) => request(data, GET,contentType.formData, `${apiUrl}homePage/myPage`) ,//我的页面显示信息
		deleteMessage:(data) => request(data, POST,contentType.formData,`${apiUrl}homePage/deleteMessage`),//删除站内信
		seeMessage: (data) => request(data, POST,contentType.formData,`${apiUrl}homePage/seeMessage`),//记录站内信为已读
		recordClickCount: (data) => request(data, POST,contentType.formData, `${apiUrl}homePage/recordClickCount`), //记录banner点击数
	},
	//训练营
	trainingCampApi: {
		homeWorkDetail:(data) => request(data, POST, contentType.formData,`${apiUrl}trainingCamp/homeWorkDetail`), //功课详情
		homeWorkList:(data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/homeWorkList`), //功课列表
		homeWorkPraise: (data) => request(data, POST, contentType.formData,`${apiUrl}trainingCamp/homeWorkPraise`), //功课点赞 
		submitComment:(data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/submitComment`), //提交训练营
		trainingCampApply: (data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/trainingCampApply`), //训练营报名
		trainingCampComment: (data) => request(data, POST, contentType.formData, `${apiUrl}trainingCamp/trainingCampComment`), //训练营介评论列表
		commentPraise: (data) => request(data, POST, contentType.formData, `${apiUrl}trainingCamp/commentPraise`), //评论点赞
		trainingCampDetail: (data) => request(data, POST, contentType.formData,`${apiUrl}trainingCamp/trainingCampDetail`) , //训练营详情页基本信息
		trainingCampIntroduce: (data) => request(data, POST,contentType.formData, `${apiUrl}trainingCamp/trainingCampIntroduce`), //训练营介绍页
		trainingCampList: (data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/trainingCampList`), //训练营列表
		myTrainingCamp: (data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/myTrainingCamp`), //我的训练营列表
		trainingCampSectionList: (data) => request(data, POST,contentType.formData,`${apiUrl}trainingCamp/trainingCampSectionList`), //训练营详情页章节列表
		updHomeWork:(data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/updHomeWork`), //提交、修改功课
		updStudyTime:(data) => request(data, POST,contentType.application,`${apiUrl}trainingCamp/updStudyTime`), //记录学习时间
	},
	//芸益问答 
	issueApi: {
		moduleList: (data) => request(data, GET,contentType.formData,`${apiUrl}issue/moduleList`), //查询问题类型
		collectionIssue:(data) => request(data, POST,contentType.formData,`${apiUrl}issue/collectionIssue`), //收藏问答
		issueComment: (data) => request(data,POST,contentType.application,`${apiUrl}issue/issueComment`) , //问答评论
		issueCommentReply:(data) => request(data, POST,contentType.formData,`${apiUrl}issue/issueCommentReply`) , //问答评论回复
		issueDetail: (data) => request(data, POST,contentType.formData,`${apiUrl}issue/issueDetail`), //问答详情
		issueList:(data) => request(data, POST,contentType.application,`${apiUrl}issue/issueList`), //问答列表
		praiseComment: (data) => request(data, POST,contentType.application,`${apiUrl}issue/praiseComment`), //评论点赞
		submitIssue: (data) => request(data, POST,contentType.application,`${apiUrl}issue/submitIssue`), //提交问题
		shareIssue: (data) => request(data, POST,contentType.formData, `${apiUrl}issue/shareIssue`), //分享问答
		seeIssueThreeMinutes:(data) => request(data, POST,contentType.formData,`${apiUrl}issue/seeIssueThreeMinutes`), //一分钟
		myIssueList: (data) => request(data, POST,contentType.application,`${apiUrl}issue/myIssueList`), //我的问答列表(提问、回答、评论、收藏)
	},
	//智慧课堂
	classApi: {
		applyClass: `${apiUrl}class/applyClass`, //报名课程
		applyClassSection: (data) => request(data, POST, contentType.application,`${apiUrl}class/applyClassSection`), //报名单节课程
		classDetail:(data) => request(data, POST, contentType.formData,`${apiUrl}class/classDetail`), //课程详情
		classList: (data) => request(data, POST, contentType.application,`${apiUrl}class/classList`), //课程列表
		classSectionList: (data) => request(data, POST, contentType.formData,`${apiUrl}class/classSectionList`), //课程目录列表
		collectionClass: (data) => request(data, POST, contentType.formData,`${apiUrl}class/collectionClass`), //收藏课程
		shareClass:(data) => request(data, POST, contentType.formData,`${apiUrl}class/shareClass`), //分享课程
		updStudyTime:  (data) => request(data, POST, contentType.formData,`${apiUrl}class/updStudyTime`), //记录学习时间
		seeClassEnding: (data) => request(data, POST, contentType.formData,`${apiUrl}class/seeClassEnding`), //看完一节课程
		myClassList: (data) => request(data, POST, contentType.application,`${apiUrl}class/myClassList`), //我的课程列表(已兑换、已收藏)
	},
	//静心阅读
	readApi: {
		apply: `${apiUrl}meditationRead/apply`, //静心阅读报名
		crownReadingList: `${apiUrl}meditationRead/crownReadingList`, //皇冠阅读列表
		lesionMeditationReadingEnd: (data) => request(data, POST, contentType.formData,`${apiUrl}meditationRead/lesionMeditationReadingEnd`), //听静心阅读时调用的接口
		list: (data)=> request(data, GET,contentType.formData,`${apiUrl}meditationRead/list`), //静心阅读列表
		menuImage: `${apiUrl}meditationRead/menuImage`, //头像
		menuList: (data) => request(data,POST,contentType.formData, `${apiUrl}meditationRead/menuList`), //章节列表
		myReadingList:(data)=> request(data, GET,contentType.formData,`${apiUrl}meditationRead/myReadingList`), //我的阅读
		praiseReading: (data) => request(data,POST,contentType.formData,`${apiUrl}meditationRead/praiseReading`) , //点赞
		readingBookSectionDetail:(data) => request(data,POST,contentType.formData,`${apiUrl}meditationRead/readingBookSectionDetail`), //查询单节阅读详情内容
		sectionReadingList:(data) => request(data,POST,contentType.formData, `${apiUrl}meditationRead/sectionReadingList`), //单节阅读列表
		sectionReadingShare: `${apiUrl}meditationRead/sectionReadingShare`, //分享
		submitReadVoice: (data) => request(data,POST,contentType.formData,`${apiUrl}meditationRead/submitReadVoice`), //提交
		updSectionContent: `${apiUrl}meditationRead/updSectionContent`, //上传/删除章节文本信息
		myFollowReadList:(data) => request(data,GET,contentType.formData,`${apiUrl}meditationRead/myFollowReadList`),  // 我的跟读列表
		collectionReadingSection:(data) => request(data,POST, contentType.formData,`${apiUrl}meditationRead/collectionReadingSection`),
		myCollectionList:(data) => request(data,GET,contentType.formData,`${apiUrl}meditationRead/myCollectionList`),
		deleteFollowReading:(data) => request(data,DELETE, contentType.formData,`${apiUrl}meditationRead/deleteFollowReading`)
	},
	//生命之树
	treeApi: {
		energyDetail:(data) => request(data,POST, contentType.application,`${apiUrl}lifeTree/energyDetail`),//获取能量明细
		taskState:(data) => request(data,GET,contentType.formData,`${apiUrl}lifeTree/taskState`),//查看用户任务状态
	},
	
	
	//父母之道
	parentApi: {
		// parentsListPrefect: `${apiUrl}parents/parentsListPrefect`, //精选列表
		particulars: `${apiUrl}parents/particulars`, //活动详情
		// parentsList: `${apiUrl}parents/parentsList` ,//父母之道列表
		myFavorite: `${apiUrl}parents/myFavorite` ,//我的收藏
		watch:`${apiUrl}parents/watch`//查看视频

	},
	//嘻哈park/活动
	parkApi: {
		xiHaParkListPrefect: `${apiUrl}xiHaPark/xiHaParkListPrefect`, //精选列表
		xiHaParkList: `${apiUrl}xiHaPark/xiHaParkList`, //活动列表-----父母之道---嘻哈parck
		collectionActivity: `${apiUrl}xiHaPark/collectionActivity`, //收藏
		activityDetails: `${apiUrl}xiHaPark/activityDetails`, //活动详情
		sendVerificationCode: `${apiUrl}xiHaPark/sendVerificationCode`, //获取验证码
		apply: `${apiUrl}xiHaPark/apply`, //活动报名
		applySuccess: `${apiUrl}xiHaPark/applySuccess`, //报名成功
		alreadyApplyActivity: `${apiUrl}xiHaPark/alreadyApplyActivity`, //已报名活动
		myFavorite: `${apiUrl}xiHaPark/myFavorite` ,//我的收藏
	},
	//用户行为
	behaviorApi: {    
		collect: `${apiUrl}behavior/collect`, //收藏
		praise: `${apiUrl}behavior/praise`, //点赞
		reply: `${apiUrl}behavior/reply`, //评论
		share: `${apiUrl}behavior/share`//分享
	},
};
