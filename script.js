const answers = [
  {
    keys: ["企业", "公司", "mcn", "知缇", "业务", "服务", "能做"],
    answer:
      "我最适合帮有真实业务的小团队做 AI 改造：先梳理流程和资料，再把隐性经验拆成 SOP / Skill / 数据工作流。对小红书 MCN、内容团队、企业内部培训尤其匹配，因为我已经在知缇跑过内容生产、评论区运营和数据流程改造。",
  },
  {
    keys: ["案例", "项目", "最强", "结果", "成果"],
    answer:
      "硬案例有四个：知缇 MCN 月营收从约 13 万到 20 万、内容效率约 3 倍提升；教零基础老妈用 AI 做小红书，半月涨粉 5000；用 Claude Code 做银行 AI 代码审计系统并申请发明专利；B 站好物视频流程 AI 替代率 80-90%。",
  },
  {
    keys: ["合作", "适合", "谁", "客户", "学员"],
    answer:
      "最适合找我的是：做小红书、自媒体、内容电商、MCN、企业知识库或内部流程提效的人。你最好已经有业务和资料，而不是只想“学点 AI”。没有业务现场，AI 咨询很容易变成提示词陪聊。",
  },
  {
    keys: ["联系", "微信", "手机", "找你"],
    answer:
      "微信：Hey__Starry。公开主页不放手机号，先用微信沟通具体业务问题更稳。",
  },
  {
    keys: ["skill", "claude", "code", "编程", "agent"],
    answer:
      "我重度使用 Claude Code，开发过 10+ 个业务 Skill。我的理解是：Skill 的价值不是保存一段提示词，而是把输入材料、判断标准、执行步骤、输出格式和验收方式封装成可重复触发的能力单元。",
  },
  {
    keys: ["知识库", "obsidian", "复盘", "日记"],
    answer:
      "我的 Obsidian 知识库有 1241 篇文档，已经不是资料仓库，而是 AI 驱动的个人全景系统：日记复盘、项目分析、微信聊天上下文、知识库变动都能被 AI 读取并生成行动建议。",
  },
];

const fallback =
  "这个问题超出了这份个人主页的资料范围。你可以问：我做过哪些项目、擅长什么、能帮企业做什么、怎么联系我。";

const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const toast = document.querySelector("#toast");

function appendMessage(text, type) {
  const message = document.createElement("div");
  message.className = `msg ${type}`;
  message.textContent = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerQuestion(question) {
  const normalized = question.toLowerCase();
  const match = answers.find((item) => item.keys.some((key) => normalized.includes(key.toLowerCase())));
  return match ? match.answer : fallback;
}

function ask(question) {
  const clean = question.trim();
  if (!clean) return;
  appendMessage(clean, "user");
  window.setTimeout(() => appendMessage(answerQuestion(clean), "bot"), 180);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(chatInput.value);
  chatInput.value = "";
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => ask(button.dataset.question));
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1600);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`已复制：${text}`);
    } catch {
      showToast(`微信：${text}`);
    }
  });
});
